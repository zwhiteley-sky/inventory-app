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
    cd backend
    node .
)

