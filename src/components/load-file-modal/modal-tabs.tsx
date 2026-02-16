import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { codeExamples } from "@/utils/code-example";

const tabs = ["csv", "json"];

export function ModalTabs() {
  const [currentTab, setCurrentTab] = useState<string>(tabs[0]);

  function handleTabChange(val: string): void {
    setCurrentTab(val);
  }

  return (
    <Tabs
      defaultValue="csv"
      value={currentTab}
      onValueChange={handleTabChange}
      className="flex flex-col"
    >
      <TabsList variant="line">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none"
          >
            {tab.toUpperCase()}
          </TabsTrigger>
        ))}
      </TabsList>

      {codeExamples.map((item, index) => (
        <TabsContent key={`${tabs[index]}.`} value={tabs[index]}>
          <pre className="w-full h-30 p-2.5 flex items-center bg-muted/50">
            <code>{item}</code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
  );
}
