import { randomNumber } from "@/utils/random-number";

export async function getRandomNumber(totalWeight: number) {
  try {
    const response = await fetch(
      `https://www.random.org/integers/?num=1&min=1&max=${totalWeight * 100}&col=1&base=10&format=plain&rnd=new`,
    );

    if (!response.ok) {
      return randomNumber(totalWeight) + 1;
    }

    const data = await response.text();

    return +data;
  } catch (error) {
    console.log("Error", error);
    return randomNumber(totalWeight) + 1;
  }
}
