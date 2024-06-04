import { useContext, useState } from "react";
import ContributionsDisplay from "./contributionsDisplay";
import { UserViewContext } from "../../pages/userView";

export default function ProfileTab() {
  const yearToday = new Date().getFullYear();
  const [contribYear, setContribYear] = useState<number>(yearToday);
  const { user } = useContext(UserViewContext);

  if (!user) return null;

  return (
    <div className="flex flex-row">
      <div className="flex flex-row ml-auto">{<ContributionsDisplay year={contribYear} />}</div>
      <div className="flex flex-col mr-auto ml-5 [&>button]:px-3 [&>button]:py-1">
        {[...Array(yearToday - user.createdAt.getFullYear() + 1)].map((_, index) => {
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
