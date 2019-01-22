package br.com.renan.softplanprocessos.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.renan.softplanprocessos.domain.Processo;

@Repository
public interface ProcessoRepository extends MongoRepository<Processo, String>{
	
	
	@Query("{feedback: []} ")
	List<Processo> findPendentes();
		
}
