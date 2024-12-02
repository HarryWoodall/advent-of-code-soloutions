export type TernaryItem = "COLUMN" | "ROW";

export type Command = {
  type: "RECT" | "ROTATE";
  valueA: number;
  valueB: number;
  ternary?: TernaryItem | undefined;
};
