// app/api/nft/mint/route.ts
import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import { mnemonicToWalletKey } from "@ton/crypto";
import { TonClient, WalletContractV4 } from "@ton/ton";
import {
  Address,
  beginCell,
  Cell,
  internal,
  toNano,
  SendMode,
} from "@ton/core";

const MNEMONIC = process.env.MNEMONIC!;
const COLLECTION_ADDRESS = process.env.COLLECTION_ADDRESS!;
const TON_ADDRESS = process.env.TON_ADDRESS!;
const TON_ENDPOINT = "https://toncenter.com/api/v2/jsonRPC"; // mainnet

function createMintBody(params: {
  queryId: number;
  itemOwnerAddress: Address;
  itemIndex: number;
  amount: bigint;
  commonContentUrl: string;
}) {
  const body = beginCell();
  body.storeUint(1, 32);
  body.storeUint(params.queryId ?? 0, 64);
  body.storeUint(params.itemIndex, 64);
  body.storeCoins(params.amount);

  const nftItemContent = beginCell();
  nftItemContent.storeAddress(params.itemOwnerAddress);

  const uriContent = beginCell();
  uriContent.storeBuffer(Buffer.from(params.commonContentUrl));

  nftItemContent.storeRef(uriContent.endCell());
  body.storeRef(nftItemContent.endCell());

  return body.endCell();
}

export async function POST(req: Request) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing image ID" }, { status: 400 });
  }

  try {
    // 1. Получаем пингвина
    const snap = await getDoc(doc(firestore, "images", id));
    if (!snap.exists()) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    const data = snap.data();
    const ipfsMetadataUrl = data.ipfsMetadataUrl;
    if (!ipfsMetadataUrl) {
      return NextResponse.json(
        { error: "Missing metadataUrl" },
        { status: 400 }
      );
    }

    // 2. Подключаем кошелек
    const mnemonic = MNEMONIC.split(" ");
    const keyPair = await mnemonicToWalletKey(mnemonic);
    const wallet = WalletContractV4.create({
      workchain: 0,
      publicKey: keyPair.publicKey,
    });
    const client = new TonClient({
      endpoint: TON_ENDPOINT,
      apiKey: process.env.TONCENTER_API_KEY,
    });
    const openedWallet = client.open(wallet);
    const seqno = await openedWallet.getSeqno();

    // 3. Настраиваем параметры минта
    const itemOwnerAddress = Address.parse(TON_ADDRESS); // raw format (EQ...)
    const nftIndex = Math.floor((Date.now() / 1000) * 2);

    const body = createMintBody({
      queryId: 0,
      itemOwnerAddress,
      itemIndex: nftIndex,
      amount: toNano("0.015"),
      commonContentUrl: ipfsMetadataUrl,
    });

    // 4. Отправка транзакции
    await openedWallet.sendTransfer({
      secretKey: keyPair.secretKey,
      seqno,
      messages: [
        internal({
          to: Address.parse(COLLECTION_ADDRESS),
          value: toNano("0.01"),
          body,
        }),
      ],
      sendMode: SendMode.IGNORE_ERRORS + SendMode.PAY_GAS_SEPARATELY,
    });

    const nftLink = `https://tonviewer.com/${COLLECTION_ADDRESS}/${nftIndex}`;

    // 5. Обновляем базу
    await updateDoc(doc(firestore, "images", id), {
      nft: true,
      mintedAt: new Date(),
      nftIndex,
      nftLink,
    });

    return NextResponse.json({ success: true, nftIndex, nftLink });
  } catch (e) {
    console.error("Mint error", e);
    return NextResponse.json({ error: "Mint failed" }, { status: 500 });
  }
}
