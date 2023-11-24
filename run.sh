# Terminate the entire process group when CTRL+C is
# detected (ensures both backend and frontend are
# terminated as well)
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

# Start the frontend
(
    cd frontend
    npm run dev &
)

# Start the backend
(
    cd backend/src
    npx sequelize-cli db:migrate:undo:all
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    node .
)

