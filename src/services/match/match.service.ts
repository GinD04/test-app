import { MatchesResponse } from "../../shared"
import { apiService } from "../api"

export const matchesService = {
    fetch: async () => {
        return await apiService.get<MatchesResponse>()
    }
}