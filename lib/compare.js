export const mimeSourceImportance = {
    'iana': 3,
    'apache': 2,
    'nginx': 1,
};
export function compareMimeEntriesBySource(a, b, sourceImportance) {
    sourceImportance ??= mimeSourceImportance;
    const aRank = a.source === undefined ? 0 : mimeSourceImportance[a.source];
    const bRank = b.source === undefined ? 0 : mimeSourceImportance[b.source];
    return aRank - bRank;
}
//# sourceMappingURL=compare.js.map