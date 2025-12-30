import { Link } from "react-router-dom";
import Shell from "../components/Shell";
import Cta from "../components/Cta";

export default function Camps() {
  return (
    <Shell>
      <h2 className="text-3xl font-bold tracking-tight">Camps</h2>
      <div className="mt-6 space-y-6 text-neutral-300 max-w-3xl">
        <div>
          <h3 className="text-xl font-semibold text-neutral-50">Register for Our Performing Arts Camps and Workshops TODAY!</h3>
          <p className="mt-2">
            Ignite your child's passion for the performing arts! Register for camps and join our amazing Acting Up family. Our experienced teachers will help your child learn and grow through the art of musical theatre, improv, acting, singing, and dancing.
          </p>
          <p className="mt-2">
            Our camps help students express themselves, gain confidence, and learn the art of communication.
          </p>
          <p className="mt-2 text-base text-neutral-300">
            *2026 Camp registration will open at the end of February 2026
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800/70 bg-neutral-900/40 p-5">
          <h4 className="text-lg font-semibold text-neutral-100">Payment Policy</h4>
          <p className="mt-2 text-base text-neutral-200">
            A non-refundable $50 deposit is charged at registration. This deposit holds your spot in camp and is applied toward your balance, which is due on the first day of each camp.
          </p>
        </div>

        <p>
          The 2025 Summer Camp season has officially come to an end. We're so proud of everything our campers accomplished and grateful for all the memories made this summer!
        </p>
        <p>
          Explore our exciting fall classes, join the fun, and take the stage with us! Visit the {" "}
          <Link to="/classes" className="underline hover:text-neutral-200">Classes page</Link> to learn more, or contact us via email or by phone.
        </p>
      </div>
      <div className="mt-8">
        <Cta href="https://app.jackrabbitclass.com/regv2.asp?id=519476">Register for Camps</Cta>
      </div>
    </Shell>
  );
}
