import type { ProfilerRow } from '../data'
import { analyzeProfilerSummary } from './analyze'
import { renderProfilerSummary } from './text'

export function buildProfilerSummary(rows: ProfilerRow[]): string {
    return renderProfilerSummary(analyzeProfilerSummary(rows))
}
