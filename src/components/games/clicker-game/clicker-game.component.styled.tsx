import styled, { keyframes } from "styled-components";

const sheen = keyframes`
  0% { transform: translateX(-120%); }
  100% { transform: translateX(125%); }
`;

export const ClickerWrap = styled.section`
  position: relative;
  width: 100%;
  height: 85vh;
  padding: 0 .2rem;
  display: grid;
  gap:  .8rem;
  grid-template-rows: auto 1fr auto;
  background: transparent;

  /* Токены темы */
  --glass-bg: rgba(20, 28, 36, 0.42);
  --glass-edge: rgba(255, 255, 255, 0.08);
  --glass-inner: rgba(255, 255, 255, 0.04);
  --text: #e9f3f8;
  --muted: #b4c6d2;
  --accent: #86e7ff; 
  --accent-2: #9ef5d7;  
  color: var(--text);
`;

const GlassBlock = styled.div`
  position: relative;
  border-radius: 20px;
  background: linear-gradient(180deg, var(--glass-bg), rgba(12, 18, 24, 0.5));
  border: 1px solid var(--glass-edge);
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    inset 0 -1px 0 rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);

  /* мягкий верхний хайлайт */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(
        120% 60% at 50% -10%,
        rgba(255, 255, 255, 0.08),
        transparent 60%
      ),
      linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 30%);
  }

  /* лёгкий «глянец» диагональной полосой */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -30%;
    height: 100%;
    width: 30%;
    background: linear-gradient(
      110deg,
      transparent 0%,
      rgba(255, 255, 255, 0.06) 45%,
      transparent 100%
    );
    filter: blur(6px);
    animation: ${sheen} 9s cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
    pointer-events: none;
    opacity: 0.6;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      display: none;
    }
  }
`;

export const ClickerHeader = styled(GlassBlock).attrs({ as: "header" })`
  padding: clamp(12px, 2.2vw, 18px) clamp(14px, 2.6vw, 22px);
  display: grid;
  align-items: center;

  /* строка метрик — можно положить <div class="metrics"> со <span class="stat"> */
  .metrics {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: clamp(8px, 2vw, 16px);
    align-items: baseline;
  }

  .stat {
    display: grid;
    gap: 4px;
    min-width: 0;

    .label {
      font-size: 12px;
      letter-spacing: 0.4px;
      color: var(--muted);
      text-transform: uppercase;
    }
    .value {
      font-variant-numeric: tabular-nums;
      font-weight: 700;
      letter-spacing: 0.4px;
      font-size: clamp(14px, 1.8vw, 18px);
      color: var(--text);
    }
  }

  /* прогресс к следующему уровню */
  .levelbar {
    margin-top: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--glass-inner);
    overflow: hidden;

    .fill {
      height: 100%;
      width: 40%; /* прим.: подставь фактический процент */
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      box-shadow: 0 0 18px rgba(134, 231, 255, 0.35);
    }
  }
`;

export const ClickerCanvas = styled(GlassBlock)`
  display: grid;
  place-items: center;
  padding: clamp(14px, 2.8vw, 28px);
  min-height: min(60vh, 640px);
  overflow: hidden;

  /* зона для кликабельного пингвина */
  .penguin {
    position: relative;
    display: grid;
    place-items: center;
    max-width: min(420px, 65vw);
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 16px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.03),
      rgba(255, 255, 255, 0.01)
    );
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05),
      inset 0 -1px 0 rgba(255, 255, 255, 0.02);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:hover {
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(0px) scale(0.99);
    }

    img {
      width: 88%;
      height: 88%;
      object-fit: contain;
      filter: drop-shadow(0 18px 28px rgba(0, 0, 0, 0.35));
      user-select: none;
      -webkit-user-drag: none;
      pointer-events: none;
    }
  }

  /* заглушка-кнопка, если пингвин не выбран */
  .select-btn {
    display: inline-grid;
    place-items: center;
    gap: 6px;
    padding: 14px 18px;
    border-radius: 14px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0.04)
    );
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: var(--text);
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
    font-weight: 700;
    letter-spacing: 0.4px;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;

    &:hover {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.12),
        rgba(255, 255, 255, 0.06)
      );
      box-shadow: 0 10px 30px rgba(134, 231, 255, 0.18);
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0) scale(0.99);
    }
  }

  /* подсказка/хинт под кнопкой */
  .hint {
    margin-top: 10px;
    color: var(--muted);
    font-size: 12px;
    opacity: 0.85;
    text-align: center;
  }
`;

export const ClickerFooter = styled(GlassBlock).attrs({ as: "footer" })`
  padding: .5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  /* верхняя строка: кнопка смены и суммарный буст */
  .footer-top {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    .swap-btn {
      justify-self: start;
      padding: 10px 14px;
      border-radius: 12px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.05)
      );
      border: 1px solid rgba(255, 255, 255, 0.16);
      color: var(--text);
      font-weight: 700;
      letter-spacing: 0.3px;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.2s ease,
        background 0.2s ease;

      &:hover {
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.14),
          rgba(255, 255, 255, 0.07)
        );
        box-shadow: 0 8px 22px rgba(158, 245, 215, 0.16);
        transform: translateY(-1px);
      }
      &:active {
        transform: translateY(0) scale(0.99);
      }
    }

    .aggregate {
      justify-self: end;
      font-size: 12px;
      color: var(--muted);
      b {
        color: var(--text);
        font-weight: 700;
      }
    }
  }

  /* ряд мини-аватарок «ТОП прокачанных» */
  .avatar-list {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: thin;

    /* WebKit скролл (не обязательно) */
    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 999px;
    }
  }

  .avatar {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.06),
      rgba(255, 255, 255, 0.02)
    );
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 6px 16px rgba(0, 0, 0, 0.28);
    cursor: pointer;
    transition: transform 0.12s ease, box-shadow 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(0) scale(0.98);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      user-select: none;
      -webkit-user-drag: none;
    }

 
    .lvl {
      position: absolute;
      right: 4px;
      bottom: 4px;
      padding: 2px 6px;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.4px;
      color: #06151c;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      box-shadow: 0 0 10px rgba(134, 231, 255, 0.35);
    }

    &.selected {
      border-color: rgba(134, 231, 255, 0.6);
      box-shadow: 0 0 0 2px rgba(134, 231, 255, 0.25),
        0 10px 26px rgba(134, 231, 255, 0.18);
    }
  }
`;
