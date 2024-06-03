import { useMemo } from "react";
import Tippy from "@tippyjs/react";

import "./styles/githubStyles.css";
import "tippy.js/dist/tippy.css";

/**
 * Calculates various contributions related values for the current year.
 *
 * @returns {Object} An object containing calculated contributions values.
 * @property {number} firstCol - The index representing the day of the week on which the year begins in the first week.
 * @property {number} numOfCols - The number of weeks in the year.
 * @property {number} lastCol - The index representing the day of the week on which the year ends in the last week.
 */
function calcContributionData(year: number): { firstCol: number; numOfCols: number } {
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const firstCol = new Date(year, 0, 1).getDay();
  return {
    firstCol: firstCol,
    numOfCols: Math.ceil(((isLeapYear ? 366 : 365) + firstCol) / 7),
  };
}

/**
 * Generates the contributions display grid for a given year.
 *
 * @param {number} year - The year for which to generate the contributions display.
 * @returns {JSX.Element[]} The contributions display grid as an array of JSX elements.
 */
function generateContributionsDisplay(year: number): JSX.Element[] {
  const { firstCol, numOfCols } = calcContributionData(year);
  const levels = [0, 1, 3, 6, 9];
  const grid = [];
  let date = new Date(year, 0, 1);

  const incrementDays = () => date.setDate(date.getDate() + 1);
  const getSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  for (let col = 0; col < numOfCols; col++) {
    const rowCells: JSX.Element[] = [];

    for (let row = 0; row < 7; row++) {
      if ((col === 0 && row < firstCol) || (col === numOfCols - 1 && date.getFullYear() > year)) {
        rowCells.push(<div key={row} className="blank-contribution-cell" />);
        continue;
      }

      const contributions = Math.floor(Math.random() * 10);
      const levelIndex = levels.findIndex((level) => contributions < level);
      const dateString = date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
      const suffix = getSuffix(date.getDate());

      rowCells.push(
        <Tippy content={`${contributions || "No"} contributions on ${dateString}${suffix}.`} key={row}>
          <div className={`contribution-cell bg-lvl-${levelIndex !== -1 ? levelIndex : levels.length}`} />
        </Tippy>
      );

      incrementDays();
    }

    grid.push(
      <div key={col} className="flex flex-col">
        {rowCells}
      </div>
    );
  }

  return grid;
}

interface Props {
  year: number;
}
/**
 * A component that displays the contributions grid for a given year.
 *
 * @param {Props} props - The props containing the year.
 * @returns {JSX.Element} The contributions display component.
 */
export default function ContributionsDisplay({ year }: Props): JSX.Element {
  const grid = useMemo(() => generateContributionsDisplay(year), [year]);

  return <>{grid}</>;
}
