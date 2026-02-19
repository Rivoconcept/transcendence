// https://www.youtube.com/watch?v=9Jup6YUshak
// https://www.youtube.com/watch?v=UFEF6Em29Vk


card_game_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  score INT NOT NULL,
  is_win BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
