import { BadRequestException } from "@nestjs/common";

export const toBool = (val: any): boolean => val === true || val === "true";
export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new BadRequestException(
      `asyncForEach ~ Expected an array, instead got ${typeof array}`
    );
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
