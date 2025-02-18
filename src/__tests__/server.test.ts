import { connectBD } from "../server";
import db from "../config/db";

//Simulate a connection error to the database
jest.mock("../config/db");

describe("connectDB", () => {
  it("Should handle error to connect to the database", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(
        new Error("There was an error connecting to the database")
      );
    const consoleSpy = jest.spyOn(console, "error");
    await connectBD();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("There was an error connecting to the database")
    )
  });
});
