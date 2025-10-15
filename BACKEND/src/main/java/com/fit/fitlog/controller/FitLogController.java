package com.fit.fitlog.controller;

import com.fit.fitlog.entity.FitLog;
import com.fit.fitlog.service.FitLogService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class FitLogController {
    private final FitLogService svc;

    public FitLogController(FitLogService svc) {
        this.svc = svc;
    }

    @GetMapping
    public List<FitLog> all() {
        return svc.findAll();
    }

    @PostMapping
    public FitLog create(@RequestBody FitLog f) {
        return svc.save(f);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        svc.delete(id);
    }

}
