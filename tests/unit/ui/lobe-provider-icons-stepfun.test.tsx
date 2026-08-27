import { describe, expect, it } from "vitest";

// The initial dynamic import of the icons registry (@lobehub/icons, hundreds of
// modules) is slow in a cold vitest run; match sibling tests' timeout for the
// transform/import overhead (see agent-card.test.tsx).
describe("lobeProviderIcons fallbacks", { timeout: 30_000 }, () => {
  it("loads the icon registry and resolves the color slot to the Mono component", async () => {
    const { getLobeProviderIcon } = await import("@/shared/components/lobeProviderIcons");

    const monoIcon = getLobeProviderIcon("stepfun", "mono");
    const colorIcon = getLobeProviderIcon("stepfun", "color");

    expect(monoIcon).not.toBeNull();
    expect(colorIcon).toBe(monoIcon);
  });

  it("uses the generic search icon for AnySearch aliases", async () => {
    const { getLobeProviderIcon } = await import("@/shared/components/lobeProviderIcons");

    const aliasIcon = getLobeProviderIcon("anysearch", "mono");
    const canonicalIcon = getLobeProviderIcon("anysearch-search", "mono");

    expect(aliasIcon).not.toBeNull();
    expect(canonicalIcon).toBe(aliasIcon);
  });
});
