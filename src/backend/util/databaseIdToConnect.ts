type Connect = { connect: { databaseId: string; }; };
type Disconnect = { disconnect: true; };

export function databaseIdToConnect(databaseId: string): Connect;
export function databaseIdToConnect(databaseId: string | undefined): Connect | undefined;
export function databaseIdToConnect(
  databaseId: string | null | undefined
): Connect | Disconnect | undefined;

export function databaseIdToConnect(databaseId: string | null | undefined) {
  if (databaseId === undefined) {
    return undefined;
  }
  if (databaseId === null) {
    return { disconnect: true };
  }
  return { connect: { databaseId } };
}
