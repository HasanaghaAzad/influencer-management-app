"use client";
import Table from "@/components/ui/table";
import Link from "next/link";
import { ManagerSelect } from "./managerSelect";
import NameInput from "@/components/ui/form/nameInput";
import Button from "@/components/ui/button";
import { getAllInfluencers } from "@/app/services/influencersService";
import { useEffect, useState } from "react";

export type InfluencerData = {
  firstName: string;
  lastName: string;
  instagramAccounts: string[];
  tiktokAccounts: string[];
  manager: {
    id: number;
    name: string;
  };
};
type InfluencersData = {
  columns: {
    firstName: { title: string };
    lastName: { title: string };
    instagramAccounts: { title: string };
    tiktokAccounts: { title: string };
    manager: { title: string };
  };
  rows?: InfluencerData[];
};

export default function InfluencersList() {
  const influencersData: InfluencersData = {
    columns: {
      firstName: { title: "First Name" },
      lastName: { title: "Last Name" },
      instagramAccounts: { title: "Instagram Accounts" },
      tiktokAccounts: { title: "TikTok Accounts" },
      manager: { title: "Manager" },
    },
    rows: [],
  };

  const [influencers, setInfluencers] = useState(influencersData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loadInfluencers = async () => {
      try {
        const data = await getAllInfluencers();
        if (data.success) {
          console.log(data);
          setInfluencers({
            columns: influencersData.columns,
            rows: data.data,
          });
        } else {
          setError(data?.error || "Failed to load influencers");
        }
      } catch (err) {
        setError((err as Error)?.message);
      } finally {
        setLoading(false);
      }
    };

    loadInfluencers();
  }, []);

  // rows: [
  //   {
  //     firstName: "Peter",
  //     lastName: "Parker",
  //     instagramAccounts: ["@spidey", "@webslinger"],
  //     tiktokAccounts: ["@friendlyneighbor"],
  //     manager: {id: 1, name: "Nick Fury"},
  //   },
  //   {
  //     firstName: "Tony",
  //     lastName: "Stark",
  //     instagramAccounts: ["@ironman", "@starkindustries"],
  //     tiktokAccounts: ["@geniusplayboy", "@armoredavenger"],
  //     manager: {id: 2, name: "Pepper Potts"},
  //   },
  //   {
  //     firstName: "Natasha",
  //     lastName: "Romanoff",
  //     instagramAccounts: ["@blackwidow"],
  //     tiktokAccounts: ["@natspy"],
  //     manager: {id: 3, name: "Clint Barton"},
  //   },
  //   {
  //     firstName: "Steve",
  //     lastName: "Rogers",
  //     instagramAccounts: ["@capamerica"],
  //     tiktokAccounts: ["@shieldhero", "@firstavenger"],
  //     manager: {id: 1, name: "Nick Fury"},
  //   },
  //   {
  //     firstName: "Bruce",
  //     lastName: "Banner",
  //     instagramAccounts: ["@hulk"],
  //     tiktokAccounts: ["@greenmachine"],
  //     manager: {id: 4, name: "Betty Ross"},
  //   },
  //   {
  //     firstName: "Wanda",
  //     lastName: "Maximoff",
  //     instagramAccounts: ["@scarletwitch"],
  //     tiktokAccounts: ["@magicchaos", "@realitybender"],
  //     manager: {id: 3, name: "Clint Barton"},
  //   },
  //   {
  //     firstName: "Thor",
  //     lastName: "Odinson",
  //     instagramAccounts: ["@godofthunder"],
  //     tiktokAccounts: ["@stormbreaker"],
  //     manager: {id: 5, name: "Odin"},
  //   },
  //   {
  //     firstName: "Clint",
  //     lastName: "Barton",
  //     instagramAccounts: ["@hawkeye"],
  //     tiktokAccounts: ["@sharpestshot", "@avengersarcher"],
  //     manager: {id: 1, name: "Nick Fury"},
  //   },
  //   {
  //     firstName: "T'Challa",
  //     lastName: "Black Panther",
  //     instagramAccounts: ["@wakandaforever"],
  //     tiktokAccounts: ["@vibraniumking"],
  //     manager: {id: 6, name: "Shuri"},
  //   },
  //   {
  //     firstName: "Scott",
  //     lastName: "Lang",
  //     instagramAccounts: ["@antman"],
  //     tiktokAccounts: ["@tinyman"],
  //     manager: {id: 2, name: "Pepper Potts"},
  //   },
  // ],

  // };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <>
      <div className="flex my-3 items-end">
        <div className="w-2/5">
          <h2 className="text-xl font-bold tracking-tight text-zinc-700">
            List of all created here Influencers
          </h2>
        </div>
        <div className="flex-1">
          <div className="flex items-end gap-x-4">
            <div className="flex-1 text-right">
              <b>Filter by:</b>
            </div>
            <div className="flex-1">
              <NameInput label={{ labelText: "Influencer name" }} />
            </div>
            <div className="flex-1">
              <NameInput label={{ labelText: "Manager name" }} />
            </div>
            <div className="flex-1 h-auto">
              <Button text="Apply filters" />
            </div>
          </div>
        </div>
      </div>
      <Table
        data={{
          columns: influencers.columns,
          rows: (influencers.rows || []).map((row) => ({
            ...row,
            instagramAccounts: (
              <div>
                {row.instagramAccounts.map((ia, iaIndex) => (
                  <Link
                    href={"https://instagram.com/" + ia}
                    key={iaIndex}
                    className="block"
                  >
                    {ia}
                  </Link>
                ))}
              </div>
            ),
            tiktokAccounts: (
              <div>
                {row.tiktokAccounts.map((tk, tkIndex) => (
                  <Link
                    href={"https://tiktok.com/" + tk}
                    key={tkIndex}
                    className="block"
                  >
                    {tk}
                  </Link>
                ))}
              </div>
            ),
            manager: <ManagerSelect selectedManagerId={row.manager.id} />,
          })),
        }}
      />
    </>
  );
}
