import React from "react";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
};

export type TableColumns = {
  [columnName: string]: {
    title: string;
  };
};

export type TableRow = {
  [columnName: string]: string;
};

export type TableData = {
  columns: TableColumns;
  rows: TableRow[];
};

const Table = ({data}: {data: TableData}) => {
  return (
    <section className="bg-white dark:bg-dark py-20 lg:py-[120px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full ">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="text-center bg-primary">
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
};

export default Table;
