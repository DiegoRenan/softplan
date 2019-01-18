package br.com.renan.softplanprocessos.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.renan.softplanprocessos.domain.Processo;
import br.com.renan.softplanprocessos.dto.ProcessoDTO;
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
	
	public Processo insert(Processo obj) {
		obj.setDate(new Date());
		obj.setAuthor(obj.getAuthor());
		obj.setTitle(obj.getTitle());
		obj.setBody(obj.getBody());
		return repository.insert(obj);
	}
	
	public List<Processo> findPendentes() {
		return repository.findPendentes();
	}
	
	public Processo fromDTO(ProcessoDTO objDto) {
		return new Processo(objDto.getId(), objDto.getDate(), objDto.getTitle(), objDto.getBody(), objDto.getAuthor());
	}
	
	
}
