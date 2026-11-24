import { LockIcon } from "@phosphor-icons/react";

function ItemInspector() {
  return (
    <div className="min-w-0 overflow-hidden bg-surface-chrome flex p-4 border-x border-b  border-border-hairline">
      <div className=" flex flex-col gap-4 m-4 p-4">
        <div className="flex gap-8">
          <LockIcon />
          <h1>Example title</h1>
        </div>

        <p>email</p>
        <p>password</p>
      </div>
    </div>
  );
}

export default ItemInspector;
