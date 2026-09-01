import "dotenv/config";
import mongoose from "mongoose";

const shouldApply = process.argv.includes("--apply");

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
    });

    const companies = mongoose.connection.collection("companies");
    const opportunities = mongoose.connection.collection("opportunities");

    const companiesWithoutExternalFlag = await companies.countDocuments({
      isExternal: { $exists: false },
    });

    const opportunitiesWithoutApplicationType =
      await opportunities.countDocuments({
        applicationType: { $exists: false },
      });

    const currentIndexes = await companies.indexes();

    console.log("Migration summary:");
    console.log(
      `Companies requiring isExternal=false: ${companiesWithoutExternalFlag}`,
    );
    console.log(
      `Opportunities requiring applicationType=internal: ${opportunitiesWithoutApplicationType}`,
    );
    console.log(
      `Current company indexes: ${currentIndexes
        .map((index) => index.name)
        .join(", ")}`,
    );

    if (!shouldApply) {
      console.log("");
      console.log("Dry run only. No database changes were made.");
      console.log("Run again with --apply to perform the migration.");
      return;
    }

    const hasNewIndex = currentIndexes.some(
      (index) => index.name === "userId_unique_when_present",
    );

    if (!hasNewIndex) {
      await companies.createIndex(
        { userId: 1 },
        {
          name: "userId_unique_when_present",
          unique: true,
          partialFilterExpression: {
            userId: { $type: "objectId" },
          },
        },
      );

      console.log("Created partial unique userId index.");
    }

    const companyUpdate = await companies.updateMany(
      { isExternal: { $exists: false } },
      { $set: { isExternal: false } },
    );

    const opportunityUpdate = await opportunities.updateMany(
      { applicationType: { $exists: false } },
      { $set: { applicationType: "internal" } },
    );

    const indexesAfterCreate = await companies.indexes();
    const hasOldIndex = indexesAfterCreate.some(
      (index) => index.name === "userId_1",
    );

    if (hasOldIndex) {
      await companies.dropIndex("userId_1");
      console.log("Removed the old non-partial userId index.");
    }

    console.log(
      `Updated companies: ${companyUpdate.modifiedCount}`,
    );
    console.log(
      `Updated opportunities: ${opportunityUpdate.modifiedCount}`,
    );

    const finalIndexes = await companies.indexes();

    console.log(
      `Final company indexes: ${finalIndexes
        .map((index) => index.name)
        .join(", ")}`,
    );
    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

await runMigration();