"use client";
import Table from "@/components/ui/table";
import Link from "next/link";
import { ManagerSelect } from "./managerSelect";
import NameInput from "@/components/ui/form/nameInput";
import Button from "@/components/ui/button";
import { getInfluencers } from "@/app/services/frontend/influencersService";
import { useEffect, useState } from "react";
import { setManager } from "@/app/actions/influencers/actions";
import { AllUsersList } from "@/app/types/users";
import { getAllUsers } from "@/app/services/frontend/userService";
import { InfluencerData, InfluencersTableColumns } from "@/app/types/influencers";
import { ToastMessage } from "@/components/ui/ToastMessage";


export default function InfluencersList() {
  const influencersTableColumns: InfluencersTableColumns = {
    firstName: { title: "First Name" },
    lastName: { title: "Last Name" },
    instagramAccounts: { title: "Instagram Accounts" },
    tiktokAccounts: { title: "TikTok Accounts" },
    manager: { title: "Manager" },
  };
  const [allManagers, setManagers] = useState([] as AllUsersList);
  const [influencersData, setInfluencers] = useState<
    InfluencerData[] | undefined
  >([]);
  const [filters, setFilters] = useState({
    influencerName: "",
    managerName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadManagers = async () => {
    const allUsers = await getAllUsers();
    setManagers(allUsers);
  };

  const loadInfluencers = async () => {
    setLoading(true);
    try {
      const fetchInfluencers = await getInfluencers(filters);
      if (fetchInfluencers.success) {
        setInfluencers(fetchInfluencers.data);
        setError("");
      } else {
        setError(fetchInfluencers?.error || "Failed to load influencers");
      }
    } catch (err) {
      setError((err as Error)?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadManagers();
    loadInfluencers();
  }, []);

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    loadInfluencers();
  };

  const handleSaveChangeManager = async (
    influencerId: number | string,
    newManagerId: number | string
  ) => {
    try {
      const savedNewManager = await setManager(influencerId, newManagerId);
      if (savedNewManager.success) {
        setToastMessage("Manager changed successfully!");
        return true;
      } else {
        setError("Failed to changemanager");
      }
    } catch (err) {
      setError((err as Error)?.message);
    }
    return false;
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
      {toastMessage && (<ToastMessage message={toastMessage} onClose={() => setToastMessage(null)} />)}
      {loading ? (
        <p className="mt-10 text-center text-gray-500 py-14">Loading...</p>
      ) : error ? (
        <p className="mt-10 text-center text-red-500 py-14">Error: {error}</p>
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
                      target="blank"
                      key={iaIndex}
                      className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-extrabold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all inline-block m-2"
                    >
                      @{ia}
                    </Link>
                  ))}
                </div>
              ),
              tiktokAccounts: (
                <div>
                  {row.tiktokAccounts.map((tk, tkIndex) => (
                    <Link
                      href={"https://tiktok.com/@" + tk}
                      target="blank"
                      key={tkIndex}
                      className="bg-black text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-800 transition-colors inline-block m-2"
                    >
                      @{tk}
                    </Link>
                  ))}
                </div>
              ),
              manager: (
                <ManagerSelect
                  allManagers={allManagers}
                  defaultValue={row.manager.id}
                  influencerId={row.id}
                  onSave={(a, b) => {
                    return handleSaveChangeManager(a, b);
                  }}
                />
              ),
            })),
          }}
        />
      )}
    </>
  );
}
