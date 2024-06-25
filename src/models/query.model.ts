export interface Query {
  sort_dir?: string;
  zone_geografica?: string;
  page?: string;
  type?: string;
  page_size?: string;
  access_key?: string;
  limit?: string;
  filter?: object;
  offset?: string;
  order?: string;
  case_status?: string;
  case_date?: string;
  case_number?: string;
}

export type Iverify_Agente = {
  role: string;
  zone?: string;
  type?: string;
};

export interface SessionUser {
  user: Iverify_Agente,
  roles: string[],
  token: string
  success: boolean
  permissions: any[]
}