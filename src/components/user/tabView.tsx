import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface TabProps {
  label: string;
  children: ReactNode;
}
export const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};

interface TabViewProps {
  children: ReactElement[];
}
/**
 * Renders a tab view component with a set of tabs and their corresponding content.
 *
 * @param {TabViewProps} props - The props object containing the children of the tab view.
 * @param {ReactElement[]} props.children - The array of React elements representing the tabs.
 * @return {ReactElement} The rendered tab view component.
 */
export default function TabView({ children }: TabViewProps): ReactElement {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabIndex = children.findIndex((child) => {
      return child.props.label.toLowerCase() === params.get("tab");
    });
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
    }
  }, []);

  const handleChangeTab = (index: number) => {
    setActiveTab(index);
    const tabName = children[index].props.label.toLowerCase();
    index === 0 ? navigate("", { replace: true }) : navigate(`?tab=${tabName}`, { replace: true });
  };

  return (
    <>
      <div className="w-full [&>button]:px-3 [&>button]:py-1 m-2">
        {children.map((child, index) => (
          <button key={index} onClick={() => handleChangeTab(index)} className={`${index === activeTab ? "btn-blue" : ""}`}>
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="mx-auto">
        {children.map((child, index) => (
          <div key={index} style={{ display: index === activeTab ? "block" : "none" }}>
            {child}
          </div>
        ))}
      </div>
    </>
  );
}
