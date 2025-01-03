import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

export default sequelize;
