import React, { useRef, useState } from "react";
import {
  CrystalsSelectorApplied,
  CrystalsSelectorContent,
  CrystalsSelectorHeader,
  CrystalsSelectorOption,
  CrystalsSelectorOptionCancel,
  CrystalsSelectorWrapper,
} from "./crystals-selector.component.styled";
import { UserCrystal } from "@/types/user.types";
import Image from "next/image";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { ScaleType } from "@/types/scale.types";

const CrystalsSelector = ({
  crystals,
  crystalApplied,
  setCrystalApplied,
}: {
  crystals: UserCrystal[];
  crystalApplied: ScaleType | null;
  setCrystalApplied: (crystalType: ScaleType | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const height = contentRef.current?.scrollHeight || 0;

  return (
    <CrystalsSelectorWrapper>
      {crystalApplied ? (
        <CrystalsSelectorApplied>
          Applied:
          <Image
            width="27"
            height="34"
            src={`/csl/${crystalApplied}_csl.webp`}
            alt={crystalApplied}
          />
          <GalleryItemScaleComponent scale={crystalApplied} />
          <CrystalsSelectorOptionCancel onClick={() => setCrystalApplied(null)}>
            &times;
          </CrystalsSelectorOptionCancel>
        </CrystalsSelectorApplied>
      ) : (
        !isOpen && (
          <CrystalsSelectorHeader onClick={() => setIsOpen(!isOpen)}>
            Apply crystal
          </CrystalsSelectorHeader>
        )
      )}
      <CrystalsSelectorContent isOpen={isOpen} height={height}>
        <div ref={contentRef}>
          {crystals.map((crystal) => (
            <CrystalsSelectorOption
              key={crystal.type}
              onClick={() => {
                setCrystalApplied(crystal.type);
                setIsOpen(false);
              }}
            >
              <Image
                width="27"
                height="34"
                src={`/csl/${crystal.type}_csl.webp`}
                alt={crystal.type}
              />
              <GalleryItemScaleComponent scale={crystal.type} />
              <span>
                <b>{crystal.amount}</b>
              </span>
            </CrystalsSelectorOption>
          ))}
          <CrystalsSelectorOption>Cancel</CrystalsSelectorOption>
        </div>
      </CrystalsSelectorContent>
    </CrystalsSelectorWrapper>
  );
};

export default CrystalsSelector;
