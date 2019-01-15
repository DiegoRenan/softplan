package br.com.renan.softplanprocessos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.renan.softplanprocessos.domain.Processo;
import br.com.renan.softplanprocessos.domain.User;
import br.com.renan.softplanprocessos.repository.ProcessoRepository;
import br.com.renan.softplanprocessos.services.exceptions.ObjectNotFoundException;

@Service
public class ProcessoService {
	
	@Autowired
	private ProcessoRepository repository;
	
	
	public Processo findById(String id) {
		Optional<Processo> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Object not found"));
	}
	
	public List<Processo> findAll(){
		return repository.findAll();
	}
	
}