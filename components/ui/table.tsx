import React from "react";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-3 px-3 text-base font-medium  lg:py-6 lg:px-3`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-3 text-left text-sm font-medium`,
};

export type TableColumns = {
  [columnName: string]: {
    title: string;
  };
};

export type TableRow = {
  [columnName: string]: string | React.ReactNode;
};

export type TableData = {
  columns: TableColumns;
  rows: TableRow[];
};

export default function Table({ data }: { data: TableData }) {
  return (
    <section>
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full ">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="text-left bg-slate-300">
                  <tr>
                    {Object.keys(data.columns).map((columnName) => (
                      <th className={TdStyle.ThStyle} key={columnName}>
                        {data.columns[columnName]?.title}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {data.rows.map((row, index) => (
                    <tr key={index}>
                      {Object.keys(data.columns).map((columnName) => (
                        <td className={TdStyle.TdStyle} key={columnName}>
                          {row[columnName as keyof TableRow]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
