import Table from "@/components/ui/table";
import Link from "next/link";
import { ManagerSelect } from "./managerSelect";

export default function InfluencersList() {
  const influencersData = {
    columns: {
      firstName: {title: "First Name"},
      lastName: {title: "Last Name"},
      instagramAccounts: {title: "Instagram Accounts"},
      tiktokAccounts: {title: "TikTok Accounts"},
      manager: {title: "Manager"},
    },
    rows: [
      {
        firstName: "Peter",
        lastName: "Parker",
        instagramAccounts: ["@spidey", "@webslinger"],
        tiktokAccounts: ["@friendlyneighbor"],
        manager: {id: 1, name: "Nick Fury"},
      },
      {
        firstName: "Tony",
        lastName: "Stark",
        instagramAccounts: ["@ironman", "@starkindustries"],
        tiktokAccounts: ["@geniusplayboy", "@armoredavenger"],
        manager: {id: 2, name: "Pepper Potts"},
      },
      {
        firstName: "Natasha",
        lastName: "Romanoff",
        instagramAccounts: ["@blackwidow"],
        tiktokAccounts: ["@natspy"],
        manager: {id: 3, name: "Clint Barton"},
      },
      {
        firstName: "Steve",
        lastName: "Rogers",
        instagramAccounts: ["@capamerica"],
        tiktokAccounts: ["@shieldhero", "@firstavenger"],
        manager: {id: 1, name: "Nick Fury"},
      },
      {
        firstName: "Bruce",
        lastName: "Banner",
        instagramAccounts: ["@hulk"],
        tiktokAccounts: ["@greenmachine"],
        manager: {id: 4, name: "Betty Ross"},
      },
      {
        firstName: "Wanda",
        lastName: "Maximoff",
        instagramAccounts: ["@scarletwitch"],
        tiktokAccounts: ["@magicchaos", "@realitybender"],
        manager: {id: 3, name: "Clint Barton"},
      },
      {
        firstName: "Thor",
        lastName: "Odinson",
        instagramAccounts: ["@godofthunder"],
        tiktokAccounts: ["@stormbreaker"],
        manager: {id: 5, name: "Odin"},
      },
      {
        firstName: "Clint",
        lastName: "Barton",
        instagramAccounts: ["@hawkeye"],
        tiktokAccounts: ["@sharpestshot", "@avengersarcher"],
        manager: {id: 1, name: "Nick Fury"},
      },
      {
        firstName: "T'Challa",
        lastName: "Black Panther",
        instagramAccounts: ["@wakandaforever"],
        tiktokAccounts: ["@vibraniumking"],
        manager: {id: 6, name: "Shuri"},
      },
      {
        firstName: "Scott",
        lastName: "Lang",
        instagramAccounts: ["@antman"],
        tiktokAccounts: ["@tinyman"],
        manager: {id: 2, name: "Pepper Potts"},
      },
    ],
  };

  return (
    <>
      <Table
        data={{
          columns: influencersData.columns,
          rows: influencersData.rows.map((row) => ({
            ...row,
            instagramAccounts: (
              <div>
                {row.instagramAccounts.map((ia, iaIndex) => (
                  <Link href={"https://instagram.com/" + ia} key={iaIndex} className="block">
                    {ia}
                  </Link>
                ))}
              </div>
            ),
            tiktokAccounts: (
              <div>
                {row.tiktokAccounts.map((tk, tkIndex) => (
                  <Link href={"https://tiktok.com/" + tk} key={tkIndex} className="block">
                    {tk}
                  </Link>
                ))}
              </div>
            ),
            manager: (<ManagerSelect selectedManagerId={ row.manager.id} />),
          })),
        }}
      />
    </>
  );
}
