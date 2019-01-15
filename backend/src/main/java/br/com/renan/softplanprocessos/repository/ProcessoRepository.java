package br.com.renan.softplanprocessos.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import br.com.renan.softplanprocessos.domain.Processo;

@Repository
public interface ProcessoRepository extends MongoRepository<Processo, String>{

}
