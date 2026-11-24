import { LockIcon } from "@phosphor-icons/react";

function ItemInspector() {
  return (
    <div className="min-w-0 overflow-hidden bg-surface-selected flex p-4 border  border-border-hairline">
      <div className="bg-surface-elevated flex flex-col gap-4 m-4 p-4">
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
