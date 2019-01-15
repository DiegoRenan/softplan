package br.com.renan.softplanprocessos.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import br.com.renan.softplanprocessos.domain.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
		
		User findByUsername(String userName);
}
