lint:
	npx eslint .

setup:
	npm install --frozen-lockfile

lint-fix:
	npx eslint --fix .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8 --coverageDirectory=build/logs
