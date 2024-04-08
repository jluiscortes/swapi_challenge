import { PersonRepository } from "../../../repositories/person-repository";
import { PersonSwapi, PersonSwapiTranslate } from "../utils/person-model";
export class TranslatePerson {
  private personRepository: PersonRepository;
  constructor(personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }
  async execute(
    personSwapi: PersonSwapi | null
  ): Promise<PersonSwapiTranslate | null> {
    return this.personRepository.translate(personSwapi);
  }
}
