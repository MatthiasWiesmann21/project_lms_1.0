import { useEffect, useState } from "react";
import {
  Avatar,
  useChatContext,
  LoadingChannels as LoadingUsers,
} from "stream-chat-react";
import { UserResource } from "@clerk/types";
import { Channel, User, UserResponse } from "stream-chat";
import { ArrowLeft } from "lucide-react";
import LoadingButton from "./LoadingButton";
import { set } from "zod";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";

interface UsersMenuProps {
  loggedInUser: UserResource;
  onClose: () => void;
  onChannelSelected: () => void;
}

export default function UsersMenu({
  loggedInUser,
  onClose,
  onChannelSelected,
}: UsersMenuProps) {
  const { client, setActiveChannel } = useChatContext();
  const [users, setUsers] = useState<(UserResponse & { image?: string })[]>();

  const [selectedusers, setSelectedUsers] = useState<string[]>([]);

  const [moreUsersloading, setMoreUsersLoading] = useState(false);
  const [endOfPaginationReached, setEndOfPaginationReached] =
    useState<boolean>();

  const [searchInput, setSearchInput] = useState("");
  const searchInputDebounced = useDebounce(searchInput);

  const pageSize = 10;

  useEffect(() => {
    async function loadInitialUsers() {
      setUsers(undefined);
      setEndOfPaginationReached(undefined);

      try {
        const response = await client.queryUsers(
          {
            id: { $ne: loggedInUser.id },
            ...(searchInputDebounced
              ? {
                  $or: [
                    { name: { $autocomplete: searchInputDebounced } },
                    { id: { $autocomplete: searchInputDebounced } },
                  ],
                }
              : {}),
          },
          { id: 1 },
          { limit: pageSize + 1 }
        );
        setUsers(response.users.slice(0, pageSize));
        setEndOfPaginationReached(response.users.length <= pageSize);
      } catch (error) {
        console.log(error);
        alert("Error loading users");
      }
    }
    loadInitialUsers();
  }, [client, loggedInUser, searchInputDebounced]);

  async function loadMoreUsers() {
    setMoreUsersLoading(true);

    try {
      const lastUserId = users?.[users.length - 1].id;
      if (!lastUserId) return;

      const response = await client.queryUsers(
        {
          $and: [
            { id: { $ne: loggedInUser.id } },
            { id: { $gt: lastUserId } },
            searchInputDebounced
              ? {
                  $or: [
                    { name: { $autocomplete: searchInputDebounced } },
                    { id: { $autocomplete: searchInputDebounced } },
                  ],
                }
              : {},
          ],
        },
        { id: 1 },
        { limit: pageSize + 1 }
      );

      setUsers([...users, ...response.users.slice(0, pageSize)]);
      setEndOfPaginationReached(response.users.length <= pageSize);
    } catch (error) {
      console.log(error);
      alert("Error loading users");
    } finally {
      setMoreUsersLoading(false);
    }
  }

  function handleChannelSelected(channel: Channel) {
    setActiveChannel(channel);
    onChannelSelected();
  }

  async function startChatWithUser(userId: string) {
    try {
      const channel = client.channel("messaging", {
        members: [userId, loggedInUser.id],
      });
      await channel.create();
      handleChannelSelected(channel);
    } catch (error) {
      console.log(error);
      alert("Error creating channel");
    }
  }

  async function startGroupChat(members: string[], name?: string) {
    try {
      const channel = client.channel("messaging", {
        members,
        name,
      });
      await channel.create();
      handleChannelSelected(channel);
    } catch (error) {
      console.log(error);
      alert("Error creating channel");
    }
  }

  return (
    <div className="str-chat overflow-y-auto absolute z-10 h-full w-full border-e bg-white ">
      <div className="flex flex-col p-3">
        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <ArrowLeft onClick={onClose} className="cursor-pointer" /> Users
        </div>
        <input
          type="search"
          placeholder="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="rounded-full border border-gray-300 px-4 py-2"
        />
      </div>
      {selectedusers.length > 0 && (
        <StartGroupChatHeader
          onConfirm={(name) => startGroupChat([...selectedusers, loggedInUser.id], name)}
          onClearSelection={() => setSelectedUsers([])}
          />
      )}
      <div>
        {users?.map((user) => (
          <UserResult
            selected={selectedusers.includes(user.id)}
            onChangeselected={(selected) =>
              setSelectedUsers(
                selected
                  ? [...selectedusers, user.id]
                  : selectedusers.filter(userId => userId !== user.id)
              )
            }
            key={user.id}
            user={user}
            onUserClicked={startChatWithUser}
          />
        ))}
        <div className="px-3">
          {!users && !searchInputDebounced && <LoadingUsers />}
          {!users && searchInputDebounced && "Searching..."}
          {users?.length === 0 && <div>No users found</div>}
        </div>
        {endOfPaginationReached === false && (
          <LoadingButton
            onClick={loadMoreUsers}
            loading={moreUsersloading}
            className="m-auto mb-3 flex w-[80%] items-center bg-blue-600"
          >
            Load more users
          </LoadingButton>
        )}
      </div>
    </div>
  );
}

interface UserResultProps {
  user: UserResponse & { image?: string };
  onUserClicked: (userId: string) => void;
  selected?: boolean;
  onChangeselected: (selected: boolean) => void;
}

function UserResult({
  user,
  onUserClicked,
  selected,
  onChangeselected,
}: UserResultProps) {
  return (
    <button
      className="mb-3 flex w-full items-center gap-2 p-2 hover:bg-[#e9eaed]"
      onClick={() => onUserClicked(user.id)}
    >
      <input
        type="checkbox"
        className="mx-1 scale-125"
        checked={selected}
        onChange={(e) => onChangeselected(e.target.checked)}
        onClick={(e) => e.stopPropagation()}
      />
      <span>
        <Avatar image={user.image} name={user.name || user.id} size={40} />
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {user.name || user.id}
      </span>
      {user.online && (
        <span className="rounded-full text-xs text-green-500">Online</span>
      )}
    </button>
  );
}


interface StartGroupChatHeaderProps {
  onConfirm: (name?: string) => void;
  onClearSelection: () => void;
}

function StartGroupChatHeader({onConfirm, onClearSelection}: StartGroupChatHeaderProps) {
  const [groupChatNameInput, setGroupChatNameInput] = useState("");

  return (
    <div className="sticky top-0 z-10 flex flex-col gap-3 bg-white p-3 shadow-sm">
      <input 
        placeholder="Group name"
        className="rounded border border-gray-300 py-2 px-2"
        value={groupChatNameInput}
        onChange={(e) => setGroupChatNameInput(e.target.value)}
      />
      <div className="flex justify-center gap-3">
        <Button onClick={() => onConfirm(groupChatNameInput)} className="py-2">
          Start Group Chat
        </Button>
        <Button onClick={onClearSelection} className="bg-gray-400 py-2 active:bg-gray-500">
          Clear selection
        </Button>
      </div>
    </div>
  )
}