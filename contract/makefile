# Solidity project Makefile

# Load environment variables
include .env
export $(shell sed 's/=.*//' .env)

# Default target
.PHONY: all
all: install compile test

# Install OpenZeppelin contracts
.PHONY: install
install:
	npm install --save-dev @openzeppelin/contracts@5.0.0

# Compile Solidity contracts
.PHONY: compile
compile:
	forge build

# Run tests
.PHONY: test
test:
	forge test

# Deploy script with private key
.PHONY: deploy
deploy:
	forge script script/Deploy.s.sol --rpc-url $(SIDECHAIN_URL) --private-key $(PRIVATE_KEY) --broadcast

# Clean build artifacts
.PHONY: clean
clean:
	forge clean
