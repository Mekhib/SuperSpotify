import { useMemo } from "react";
import "../../css/signIn.css"; 
import { authService } from "../../services/authService";


const WAVE_HEIGHTS = [30, 55, 40, 70, 45, 80, 60, 35, 50, 65, 42, 58, 75, 38, 62, 48, 70, 33, 55, 44, 68, 52, 40, 60];

export default function SuperSpotifySignIn() {
  const bars = useMemo(() => {
    const playedCount = Math.floor(WAVE_HEIGHTS.length * 0.4);
    return WAVE_HEIGHTS.map((h, i) => ({ height: h, played: i < playedCount }));
  }, []);

  return (
    <div className="root ss-root">
      <section className="panel">
        <div className="glow" />
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          SuperSpotify
        </div>

        <div className="panel-copy">
          <h1>Welcome back.</h1>
          <p>Sign in to pick up right where you left off.</p>
        </div>

        <div className="waveform" aria-hidden="true">
          {bars.map((bar, i) => (
            <span
              key={i}
              className={bar.played ? "played" : ""}
              style={{ height: `${bar.height}%` }}
            />
          ))}
        </div>
      </section>

      <section className="form-side">
        <div className="form-card">
          <h2>Sign in</h2>
          <p className="sub">Continue with your Spotify account.</p>
          
          {/* Added App Description */}
          <p className="app-description">
            Experience your favorite music through a highly interactive, dynamic web player. Access your playlists, explore new tracks, and enjoy seamless audio playback with real-time visualizers.
          </p>

          <div className="button-group">
            {/* Primary Action */}
            <button className="btn btn-primary" type="button" onClick={() => authService.login()}>
              <span className="mini-eq" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              Sign in with Spotify
            </button>

            {/* Secondary Action */}
            <button className="btn btn-secondary" type="button" onClick={() => authService.demoLogin()}>
              <span className="mini-eq secondary-eq" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              Try Demo Mode
            </button>
          </div>

          <p className="footer-line">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
}