require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { AccessToken } = require("livekit-server-sdk");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/health", (_req, res) =>
  res.json({ ok: true, app: "SawtChat" })
);

app.post("/token", async (req, res) => {
  try {
    const identity = String(req.body?.identity || "").trim();
    const room = String(req.body?.room || "").trim();

    if (!identity || !room) {
      return res.status(400).json({
        error: "identity and room are required"
      });
    }

    if (
      !process.env.LIVEKIT_API_KEY ||
      !process.env.LIVEKIT_API_SECRET
    ) {
      return res.status(500).json({
        error: "LiveKit server credentials are not configured"
      });
    }

    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      { identity, ttl: "2h" }
    );

    token.addGrant({
      roomJoin: true,
      room,
      canPublish: true,
      canSubscribe: true
    });

    const jwt = await token.toJwt();

    res.json({
      token: jwt,
      url: process.env.LIVEKIT_URL
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Could not create token"
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `SawtChat backend listening on http://localhost:${PORT}`
  );
});
