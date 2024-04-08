import { PersonRepository } from "../../../repositories/person-repository";
import { PersonSwapi } from "../utils/person-model";
export class SearchPerson {
  private personRepository: PersonRepository;
  constructor(personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }
  async execute(id: number): Promise<PersonSwapi> {
    return this.personRepository.getPersonById(id);
  }
}
