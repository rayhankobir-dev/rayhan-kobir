import { useAuth as useContextAuth } from "../context/AuthContext";
export function useAuth() {
    return useContextAuth();
}
