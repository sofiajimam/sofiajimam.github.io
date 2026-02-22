interface Tab {
  id: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  active: string;
  setActive: (id: string) => void;
  closeTab: (id: string) => void;
}

export default function Tabs({ tabs, active, setActive, closeTab }: Props) {
  return (
    <div className="flex border-b bg-gray-200">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center px-3 py-2 text-sm border-r cursor-pointer
          ${active === tab.id ? "bg-white" : "opacity-70"}
          `}
          onClick={() => setActive(tab.id)}
        >
          <span>
            {tab.label}
          </span>

          <button
            onClick={() => closeTab(tab.id)}
            className="ml-2 px-1 text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-300 rounded cursor-pointer"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
