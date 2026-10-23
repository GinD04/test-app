import { useCallback, useEffect, useRef, useState } from "react";
import { matchesService } from "../services/match/match.service";
import { Match } from "../shared";

type State = {
  matches: Match[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
};

const initialState: State = {
  matches: [],
  loading: true,
  error: null,
  lastUpdated: null,
};

export function useMatches() {
  const [state, setState] = useState<State>(initialState);
  const requestIdRef = useRef(0);

  const load = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await matchesService.fetch();
      if (requestId !== requestIdRef.current) return;
      setState({ matches: response.matches, loading: false, error: null, lastUpdated: new Date() });
    } catch (e) {
      if (requestId !== requestIdRef.current) return;
      setState((prev) => ({
        ...prev,
        loading: false,
        error: e instanceof Error ? e.message : 'Неизвестная ошибка',
      }));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { ...state, refresh: load };
}
function fetchMatches() {
    throw new Error("Function not implemented.");
}

