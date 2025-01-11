export interface CreateEmployeeResponse {
  success: boolean;
  data: {
    id: number;
    name: string;
    code: string;
    createdAt: Date;
  };
}
