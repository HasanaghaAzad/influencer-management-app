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
type InfluencersTableColumns = {
  firstName: { title: string };
  lastName: { title: string };
  instagramAccounts: { title: string };
  tiktokAccounts: { title: string };
  manager: { title: string };
};

export default function InfluencersList() {
  const influencersTableColumns: InfluencersTableColumns = {
    firstName: { title: "First Name" },
    lastName: { title: "Last Name" },
    instagramAccounts: { title: "Instagram Accounts" },
    tiktokAccounts: { title: "TikTok Accounts" },
    manager: { title: "Manager" },
  };

  const [influencersData, setInfluencers] = useState<
    InfluencerData[] | undefined
  >([]);
  const [filters, setFilters] = useState({
    influencerName: "",
    managerName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const loadInfluencers = async () => {
    setLoading(true);
    try {
      const data = await getAllInfluencers(filters);
      if (data.success) {
        console.log(data);
        setInfluencers(data.data);
        setError("");
      } else {
        setError(data?.error || "Failed to load influencers");
      }
    } catch (err) {
      setError((err as Error)?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInfluencers();
  }, []);

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    loadInfluencers();
  };

  return (
    <>
      <div className="flex my-3 items-end">
        <div className="w-2/5">
          <h2 className="text-xl font-bold tracking-tight text-zinc-700">
            List of all created here Influencers
          </h2>
        </div>
        <form className="flex-1" onSubmit={handleApplyFilters}>
          <div className="flex items-end gap-x-4">
            <div className="flex-1 text-right">
              <b>Filter by:</b>
            </div>
            <div className="flex-1">
              <NameInput
                label={{ labelText: "Influencer name" }}
                name="influencerName"
                value={filters.influencerName}
                onChange={handleFilterInputChange}
              />
            </div>
            <div className="flex-1">
              <NameInput
                label={{ labelText: "Manager name" }}
                name="managerName"
                value={filters.managerName}
                onChange={handleFilterInputChange}
              />
            </div>
            <div className="flex-1 h-auto">
              <Button text="Apply filters" />
            </div>
          </div>
        </form>
      </div>

      {loading ? (
        <p className="mt-5 text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="mt-5 text-center text-red-500">Error: {error}</p>
      ) : (
        <Table
          data={{
            columns: influencersTableColumns,
            rows: (influencersData || []).map((row) => ({
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
      )}
    </>
  );
}
