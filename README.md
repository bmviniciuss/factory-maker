# Factory Maker
## Generate model factories

### Define a model interface/type
```typescript
export type UserDomain = {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}
```

### Define a generic model factory maker
```typescript
import faker from 'faker'
import { DeepPartial } from 'factory-maker'

function makeDomainUser (options?: DeepPartial<UserDomain>):UserDomain {
  return {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.random.hexaDecimal(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...options
  }
}
```

### Create factory
```typescript
import factoryMaker from "factory-maker"

export default factoryMaker<UserDomain>(makeDomainUser)
```

### How to user
```typescript
userDomainFactory(1) // returns UserDomain
userDomainFactory(2) // returns UserDomain[]
```