export interface MySQLResponse {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: number;
  serverStatus: number;
  warningStatus: string;
  changedRows: number;
}
