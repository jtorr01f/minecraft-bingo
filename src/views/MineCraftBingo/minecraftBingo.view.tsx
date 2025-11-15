"use client";

import { useState, FC } from "react";
import { IconArrowBackUp, IconExclamationCircle, IconPick } from "@tabler/icons-react";



import { BingoItem } from "@/types/minecraft";

import { bingoArray, minecraftItemsArray, tooltipText } from "@/constants/minecraft.constants";

import Tooltip from "@/components/ToolTip/tooltip.component";

import './minecraftBingo.styles.css';


const getAllBingoCombinations = () => {
  const all = [];
  for (const letter of bingoArray) {
    for (const item of minecraftItemsArray) {
      all.push(`${letter} - ${item}`);
    }
  }
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
};

const MinecraftBingo: FC = () => {
  const [bingo, setBingo] = useState<BingoItem[]>([]);
  const [bingoPool, setBingoPool] = useState<string[]>(getAllBingoCombinations());

  const onItemUndo = () => {
    if (bingo.length === 0) return;
    const lastItem = bingo[bingo.length - 1];
    setBingoPool([lastItem.value, ...bingoPool]);
    setBingo(bingo.slice(0, -1));
  };

  const getBingo = () => {
    if (bingoPool.length === 0) {
      alert("Oopsie doopsie! No more items left in the pool! If someone hasnt won by now, they probably never will!");
      return;
    }
    const [next, ...rest] = bingoPool;
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto 
      ? crypto.randomUUID()
      : String(Date.now());

    setBingoPool(rest);
    setBingo([
      ...bingo,
      {
        key: id,
        value: next,
        number: bingo.length + 1,
      },
    ]);
  };

  return (
    <div className="bingo-wrapper">
      <div className="bingo-header">
        <div className="bingo-desc">
          <h2>Minecraft Bingo</h2>
          <Tooltip text={tooltipText}>
            <IconExclamationCircle className="bingo-info-icon" />
          </Tooltip>
        </div>
        <div className="bingo-button-wrapper">
          <IconPick className="bingo-button" size={50} onClick={getBingo} />
          <IconArrowBackUp className="bingo-button" onClick={onItemUndo} size={50} />
        </div>
      </div>
      <div className="bingo-list-wrapper">
        <ul className="bingo-items">
          {bingo.map((item: BingoItem) => (
            <div className="bingo-item-wrapper" id={item.key} key={item.key}>
              <li className="bingo-item">{`${item.number}.) ${item.value}`}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MinecraftBingo;