import { useState } from "react";
import ContributionsDisplay from "./contributionsDisplay";

interface Props {
  createdAtYear: number;
}
export default function ProfileTab({ createdAtYear }: Props) {
  const yearToday = new Date().getFullYear();
  const [contribYear, setContribYear] = useState<number>(yearToday);

  return (
    <div className="flex flex-row">
      <div className="flex flex-row ml-auto">{<ContributionsDisplay year={contribYear} />}</div>
      <div className="flex flex-col mr-auto ml-5 [&>button]:px-3 [&>button]:py-1">
        {[...Array(yearToday - createdAtYear + 1)].map((_, index) => {
          const calcYear = yearToday - index;
          return (
            <button key={index} onClick={() => setContribYear(calcYear)} className={`mb-1 ${contribYear === calcYear ? "btn-blue" : "text-black"}`}>
              <span className="font-bold ">{calcYear}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
