interface LoginResp {
  token: string;
  role: string;
  email: string;
  first_Name: string;
  last_Name: string;
  id: string;
}

interface UserProfileRespData {
  _id: string;
  first_Name: string;
  last_Name: string;
  email: string;
  role: "client" | "photographer";
  photography_style?: string[];
}

interface UserData {
  id: string;
  first_Name: string;
  last_Name: string;
  email: string;
  role: "client" | "photographer";
}
