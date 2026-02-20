// https://www.youtube.com/watch?v=SkNNw5WeJQM&list=PLuMW20nBgcbo6HLxsCG-cI0kIXiZ8zYvH&index=7
// https://www.youtube.com/watch?v=ha_leEpnT30
// https://www.youtube.com/watch?v=TYB-Lz8YGFk
// https://www.youtube.com/watch?v=tJt2MoT_BpU

// https://www.youtube.com/watch?v=fMwo0LBIlhY

// 
// https://www.youtube.com/watch?v=xJ1finMWxvM
Plan :

Évaluer le minimal nécessaire. 2) Proposer champs recommandés. 3) Suggestion de type/raison. Voulez-vous que j'implémente la migration/entité ensuite ?
Contexte frontend

Le frontend (ex. CardContext.tsx + CardGameAtoms.ts) conserve les 3 cartes tirées et calcule score via proofByNine(sum). L'action drawAll produit les 3 cartes (id + value).
Minimum à persister

user_id: identifiant du joueur.
score: score final calculé (résultat de proofByNine).
is_win: bool — victoire ou défaite.
created_at: timestamp de la partie.
Raisons : ces champs suffisent pour les stats/leaderboard simples.

Champs fortement recommandés (meilleure traçabilité / debug / replay)

drawn_cards: JSONB array [{id, value, position}] — permet de rejouer ou vérifier le calcul.
raw_sum: integer — somme brute des valeurs (avant preuve par 9).
seed (optionnel): string/number — état RNG si vous voulez rejouer exactement.
duration_ms: integer — durée de la partie.
game_mode / variant: string — si plusieurs modes existent.
client_info (optionnel): JSONB — device/browser pour analytics.
Raisons : stocker les cartes brutes + somme permet de recalculer ou auditer sans ambiguïté; JSONB est pratique côté frontend.

Schema Postgres suggéré (simple)

id: uuid (PK)
user_id: uuid (FK)
score: integer
is_win: boolean
raw_sum: integer
drawn_cards: jsonb
seed: text (nullable)
duration_ms: integer (nullable)
created_at: timestamptz default now()
Conseil pratique

Si le volume est faible, utilisez une seule table games avec drawn_cards JSONB. Si vous attendez gros volume/queries par carte, normalisez en table drawn_cards.
N’enregistrez pas seulement is_win et score si vous voulez audit/replay plus tard — conservez au moins drawn_cards ou raw_sum.